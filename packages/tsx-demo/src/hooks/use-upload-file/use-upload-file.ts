import { message } from 'antd';
import { useState } from 'react';
import { cloneDeep } from 'lodash';

import { UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

import { UseUploadFile } from './types/types';


/**
 * @method 上传文件自定义hooks
 * @param postFile 上传文件请求
 * @param fileLength 上传文件数量限制，默认为1
 */
const useUploadFile: UseUploadFile = (postFile, { isBreak, fileLength, getBreakInfo } = { isBreak: false, fileLength: 1 }) => {

  // 上传的文件列表
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  // 进度条
  const [progress, setProgress] = useState(0);

  // loading
  const [loading, setLoading] = useState(false);

  // 参数
  const uploadProps: UploadProps & any = {
    multiple: true,
    headers: {
      Authorization: '$prefix $token',
    },
    onStart() {
      setProgress(0);
    },
    onSuccess(res: any, file: any) {
      const list = cloneDeep(fileList);
      file.status = 'done';
      file.url = res.data;
      list.push(file);
      setFileList(list);
      setProgress(100);
    },
    onError(err: any) {
      setProgress(0)
    },
    onProgress({ percent }: any) {
      setProgress(percent);
    },
    async customRequest(option: any) {
      const {
        // data,
        file,
        // filename,
        onError,
        // onProgress,
        onSuccess,
        // withCredentials,
      } = option;

      //上传限制
      if (fileLength === fileList.length) return message.error(`最多上传${fileLength}个文件！`);

      const formData = new FormData();

      let size = 0;

      if (isBreak) {
        if (!getBreakInfo) throw Error('getBreakInfo is must be a function');
        const { data } = await getBreakInfo(file.name);

        size = data;
      }

      console.log('文件大小', file.size, size);

      if (size === file.size) return message.error('您已上传过这个文件');

      formData.append('file', (file as Blob).slice(size, (file as Blob).size), file.name);

      try {
        setLoading(true);
        const res = await postFile(formData, ({ progress }) => {
          setProgress(progress)
        })
        setLoading(false);
        onSuccess(res, file);
      } catch (e) {
        setLoading(false);
        onError(e);
      }

      return {
        abort() {
          message.error('文件上传被中止！')
        },
      };
    },
    onChange(info: any) {
      const { file: { status, name, uid } } = info;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        message.success(`${name} file uploaded successfully`);
      } else if (status === 'error') {
        message.error(`${name} file upload failed.`);
      }


      if (status === 'removed') {
        const list = fileList.filter(i => i.uid !== uid);
        setFileList(list);
        setProgress(0);

      }
    },
    fileList,
  }

  return { uploadProps, progress, loading }
}

export default useUploadFile;