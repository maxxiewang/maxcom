import React from 'react'
import { UploadFile } from './upload'
import MxIcon from '../Icon/icon'
import Progress from '../Progress/progress'

export interface UploadListProps {
  fileList: UploadFile[]
  onRemove: (_file: UploadFile) => void
}
const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props
  return (
    <ul className="viking-upload-list">
      {fileList.map((item) => {
        return (
          <li key={item.uid} className="viking-upload-list-item">
            {/* 根据不同类型展示不同颜色 */}
            <span className={`file-name file-name-${item.status}`}>
              <MxIcon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === 'uploading' || item.status === 'ready') && (
                <MxIcon icon="spinner" spin theme="primary" />
              )}
              {item.status === 'success' && (
                <MxIcon icon="check-circle" theme="success" />
              )}
              {item.status === 'error' && (
                <MxIcon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="file-actions">
              <MxIcon
                icon="times"
                onClick={() => {
                  onRemove(item)
                }}
              />
            </span>
            {item.status === 'uploading' && (
              <Progress percent={item.percent || 0} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList
