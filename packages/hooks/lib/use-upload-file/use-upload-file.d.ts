import { UploadProps } from "antd/lib/upload";
declare type PostFile<Response> = (formData: FormData, onprogress: any) => Promise<Response>;
declare type UseUploadFile = <T>(postFile: PostFile<T>, { isBreak, fileLength, getBreakInfo, }?: {
    isBreak?: boolean;
    fileLength?: number;
    getBreakInfo?: (filename: string) => Promise<Record<"data", number>>;
}) => {
    uploadProps: UploadProps;
    loading: boolean;
    progress: number;
};
/**
 * @method 上传文件自定义hooks
 * @param postFile 上传文件请求
 * @param fileLength 上传文件数量限制，默认为1
 */
declare const useUploadFile: UseUploadFile;
export default useUploadFile;
