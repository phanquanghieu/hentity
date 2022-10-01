import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getEntityBySingularName } from 'redux/slices/entityManagerSlice'
import { Select } from 'ui'
import { axios } from 'utils'
import { cloneDeep, isArray, isNull, isObject } from 'lodash'
import { BiX } from 'react-icons/bi'

function Relation(p, ref) {
  const entityTarget = useSelector(getEntityBySingularName(p.reference))
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState(null)

  const labelColumn = entityTarget.attributes[0].columnName
  const isSingleAssociation = ['hasOne', 'belongsTo'].includes(p.association)

  const { data: options } = useQuery([entityTarget.singularName, searchValue], async () => {
    const labelColumn = entityTarget.attributes[0].columnName
    const params = searchValue
      ? {
          where: { [labelColumn]: { $substring: searchValue } },
        }
      : {}
    const { data } = await axios.get(`/entity_manager/collection/${entityTarget.singularName}`, {
      params,
    })

    return data.map((d) => ({ label: d[labelColumn], value: d.id }))
  })

  // useEffect(() => {}, [value])
  useEffect(() => {
    let _value
    if (isSingleAssociation) {
      _value = isObject(p.value) ? { value: p.value.id, label: p.value[labelColumn] } : null
    } else {
      _value = isArray(p.value) ? p.value.map((v) => ({ value: v.id, label: v[labelColumn] })) : []
    }
    p.onChange(calcValue(_value))
    setValue(_value)
  }, [])

  const handleChangeValue = (_value) => {
    console.log(_value)
    if (isSingleAssociation) {
      p.onChange(calcValue(_value))
      setValue(_value)
    } else {
      p.onChange([...calcValue(value), _value.value])
      setValue([...value, _value])
    }
  }
  const handleDeleteValue = (id) => {
    p.onChange(calcValue(value).filter((v) => v !== id))
    setValue(value.filter((v) => v.value !== id))
  }

  return (
    <div>
      <Select
        ref={ref}
        {...p}
        isSearchable
        onChangeSearchValue={setSearchValue}
        value={isSingleAssociation ? value : ''}
        onChange={handleChangeValue}
        options={options?.filter?.(
          (option) =>
            // !(isArray(value) ? value.map((v) => v.value) : [value?.value]).includes(option.value)
            !toArray(calcValue(value)).includes(option.value)
        )}
      />
      {!isSingleAssociation && (
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
      )}
    </div>
  )
}

export default React.forwardRef(Relation)

const toArray = (value) => {
  if (!isArray(value)) return [value]
  return value
}
const calcValue = (value) => {
  if (isArray(value)) return value.map((v) => v.value)
  if (isObject(value)) return value.value
  return null
}
