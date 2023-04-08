import { setupWorker } from 'msw';
import { handlers } from '@/mocks/api';

// 指定されたリクエストハンドラを持つサービスワーカーを設定する
export const worker = setupWorker(...handlers);
