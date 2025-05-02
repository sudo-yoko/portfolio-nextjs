import { Validator } from '@/modules/validator/validator-interface';

/**
 * 必須チェック
 */
export const required: Validator = {
  validate: (name, value) => {
    return [];
  },
};
