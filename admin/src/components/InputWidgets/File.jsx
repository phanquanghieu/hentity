import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Select } from 'ui'
import { axios } from 'utils'
import { isArray, isObject } from 'lodash'

function File(p, ref) {
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState(null)
  const [fileHost, setFileHost] = useState('')

  const { data: options } = useQuery(['files', searchValue], async () => {
    const params = searchValue
      ? {
          where: { name: { $substring: searchValue } },
        }
      : {}
    const { data } = await axios.get(`/upload/files`, {
      params,
    })

    return data.map((d) => ({ label: d.name, value: d.id, url: d.url }))
  })

  useEffect(() => {
    let _value = isObject(p.value)
      ? { value: p.value.id, label: p.value.name, url: p.value.url }
      : null
    p.onChange(_value?.value)
    setValue(_value)
  }, [])

  useEffect(() => {
    const fetchFileHost = async () => {
      const res = await axios.get(`/upload/host`)
      setFileHost(res?.data?.file_host)
    }
    fetchFileHost()
  }, [])

  const handleChangeValue = (_value) => {
    p.onChange(_value?.value ?? null)
    setValue(_value)
  }

  return (
    <div>
      <Select
        ref={ref}
        {...p}
        isSearchable
        onChangeSearchValue={setSearchValue}
        value={value}
        onChange={handleChangeValue}
        options={options}
      />
      <div className='h-32 -mt-1 pt-1 rounded-b border shadow flex justify-center items-center'>
        {value?.url && <img className='h-28' src={`${fileHost}${value.url}`} />}
      </div>
      {/* {!isSingleAssociation && (
        <div className='mt-1'>
          {value?.map?.((v) => {
            return (
              <div
                key={v.value}
                className='pl-3 pr-1 py-0.5 rounded border text-slate-700 flex justify-between items-center'
              >
                <div className='overflow-hidden'>{v.label}</div>
                <div onClick={() => handleDeleteValue(v.value)}>
                  <BiX className='h-5 w-5 rounded-full hover:bg-red-500 hover:text-white cursor-pointer transition' />
                </div>
              </div>
            )
          })}
        </div>
      )} */}
    </div>
  )
}

export default React.forwardRef(File)
