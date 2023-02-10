import { get, post } from '@/utils/request';
//系统配置
export const getParamConfigByCode = data => get('/api/yn-extra/app/paramConfig/getParamConfigByCode', data);