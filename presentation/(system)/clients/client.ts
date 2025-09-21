import axios from 'axios';

/**
 * Axiosインスタンス
 */
export const client = axios.create({ timeout: 10000 });
