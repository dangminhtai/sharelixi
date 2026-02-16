
import { supabase } from '@/utils/supabase';
// import { WheelPrize } from '@/utils/random';

export interface SpinRecord {
    ip_address: string;
    device_info: string;
    prize: string;
    prize_value: number | string;
}

export const SpinService = {
    // 1. Lấy IP người dùng (Client-side)
    async getUserIP(): Promise<string | null> {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Error fetching IP:", error);
            // Fallback nếu lỗi (có thể cho qua hoặc chặn tùy policy)
            return null;
        }
    },

    // 2. Kiểm tra xem IP/Device đã quay chưa
    async checkCanSpin(ip: string): Promise<boolean> {
        if (!ip) return true;

        // Nếu Supabase chưa init (do thiếu env vars), cho phép quay (Fail-open)
        if (!supabase) {
            console.warn("Supabase not configured, skipping IP check.");
            return true;
        }

        try {
            const { data, error } = await supabase
                .from('spin_history')
                .select('id')
                .eq('ip_address', ip)
                .limit(1);

            if (error) throw error;

            // Nếu có record -> Đã quay rồi -> return false
            return data && data.length > 0 ? false : true;
        } catch (error) {
            console.error("Error checking spin history:", error);
            return true; // Lỗi server thì ưu tiên cho người dùng trải nghiệm (fail-open)
        }
    },

    // 3. Lưu kết quả quay
    async saveSpinResult(record: SpinRecord): Promise<boolean> {
        if (!supabase) {
            console.warn("Supabase not configured, skipping save result.");
            return false;
        }

        try {
            const { error } = await supabase
                .from('spin_history')
                .insert([
                    {
                        ip_address: record.ip_address,
                        device_info: record.device_info,
                        prize: record.prize + (typeof record.prize_value === 'number' ? ` (${record.prize_value.toLocaleString()}đ)` : ''),
                    }
                ]);

            if (error) {
                console.error("Error saving spin result:", error);
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error in saveSpinResult:", error);
            return false;
        }
    }
};
