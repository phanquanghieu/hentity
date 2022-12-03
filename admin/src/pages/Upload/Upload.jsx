import React, { useEffect, useState } from 'react'
import { useFormatMessage } from 'hooks'
import { Button, Pagination, Select } from 'ui'
import { BiPlus } from 'react-icons/bi'
import { ceil, get } from 'lodash'
import { axios } from 'utils'
import { toast } from 'react-toastify'

function Upload() {
  const [files, setFiles] = useState([])
  const [fileHost, setFileHost] = useState('')
  const [count, setCount] = useState(0)
  const [query, setQuery] = useState({ pageSize: 10, page: 1 })

  const fetchFiles = async () => {
    const res = await axios.get(`/upload/files`, {
      params: { ...query },
    })
    setFiles(get(res, 'data') || [])
    setCount(get(res, 'metadata.count', 0))
  }

  useEffect(() => {
    const fetchFileHost = async () => {
      const res = await axios.get(`/upload/host`)
      setFileHost(res?.data?.file_host)
    }
    fetchFileHost()
  }, [])

  useEffect(() => {
    fetchFiles()
  }, [query])

  const t = useFormatMessage()

  const handleUpload = async (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    const res = await axios.post(`/upload/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (res.data) {
      toast.success('Upload success!')
      fetchFiles()
    } else toast.error('Upload error!')
  }

  return (
    <div className='relative h-screen overflow-scroll flex-1 flex flex-col'>
      <div className='sticky top-0 z-10 min-h-[4rem] px-6 shadow-md border-l bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{'Files'}</div>
        <div>
          <label htmlFor='file-input'>
            <input className='hidden' type='file' onChange={handleUpload} id='file-input' />
            <Button color='base' htmlTag='div'>
              <div className='flex items-center'>
                <BiPlus className='w-5 h-5 -ml-1 mr-1' />
                <div>{t('Add new file')}</div>
              </div>
            </Button>
          </label>
        </div>
      </div>
      <div className='p-8 min-w-0 flex-1 flex flex-col'>
        <div className='-m-2 flex flex-wrap'>
          {files.map((file) => (
            <div className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2' key={file.id}>
              <div className='p-2 pb-1 shadow rounded bg-white'>
                <div className='flex justify-center items-center'>
                  <img className='h-28' src={`${fileHost}${file.url}`} />
                </div>
                <div className='mt-2 whitespace-nowrap overflow-hidden'>{file.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-4 flex justify-between'>
          <div>
            <Select
              options={PAGE_SIZE_OPTIONS}
              value={PAGE_SIZE_OPTIONS.find(
                (PAGE_SIZE_OPTION) => PAGE_SIZE_OPTION.value === query.pageSize
              )}
              onChange={(_pageSize) => setQuery({ ...query, pageSize: _pageSize.value })}
              className='w-28 h-8 pr-0 border-transparent shadow'
              isClearable={false}
            />
          </div>
          <div>
            <Pagination
              pageCount={ceil(count / query.pageSize) || 1}
              page={query.page}
              onChangePage={(_page) => setQuery({ ...query, page: _page })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload

const PAGE_SIZE_OPTIONS = [
  { label: '5 / page', value: 5 },
  { label: '10 / page', value: 10 },
  { label: '20 / page', value: 20 },
  { label: '50 / page', value: 50 },
  { label: '100 / page', value: 100 },
]
