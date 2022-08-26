import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAttributeEdit,
  setAttributeEdit,
  setShowModalAttribute,
} from 'redux/slices/entityBuilderSlice'
import { useFormatMessage } from 'hooks'

import { Modal } from 'ui'
import AttributeBuilder from './AttributeBuilder'
import { ATTRIBUTES } from 'constant/attributes'

function ModalAttributes() {
  const attributeEdit = useSelector(getAttributeEdit)

  const dispatch = useDispatch()
  const t = useFormatMessage()

  return (
    <Modal
      header={attributeEdit.type ? t('Edit Attribute') : t('Choose Attribute Type')}
      className='md:mt-8 lg:mt-16'
      show={true}
      onClose={() => dispatch(setShowModalAttribute(false))}
    >
      {!attributeEdit.type && (
        <div className='p-6 overflow-auto'>
          <div className='grid grid-cols-3 gap-4'>
            {Object.values(ATTRIBUTES).map((ATTRIBUTE) => (
              <div
                className='h-14 px-4 border rounded-md shadow flex items-center cursor-pointer
                  hover:bg-base-100 hover:shadow-md'
                onClick={() => dispatch(setAttributeEdit({ ...ATTRIBUTE.model }))}
                key={ATTRIBUTE.info.label}
              >
                <div>
                  <ATTRIBUTE.info.icon />
                </div>
                <div className='ml-4'>
                  <div className='font-medium'>{ATTRIBUTE.info.label}</div>
                  <div className='text-sm text-slate-500'>{ATTRIBUTE.info.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {attributeEdit.type && (
        <div className='overflow-auto'>
          <AttributeBuilder />
        </div>
      )}
    </Modal>
  )
}

export default ModalAttributes
