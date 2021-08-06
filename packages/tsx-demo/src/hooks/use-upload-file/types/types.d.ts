import { UploadProps } from 'antd/lib/upload';
import { onProgress } from '@/utils/request/types/types';

type PostFile<Response> = (formData: FormData, onprogress: onProgress) => Promise<Response>;

type UseUploadFile = <T>(postFile: PostFile<T>, { isBreak, fileLength, getBreakInfo }?: { isBreak?: boolean; fileLength?: number, getBreakInfo?: (filename: string) => Promise<Record<'data', number>> }) => { uploadProps: UploadProps, loading: boolean; progress: number };
