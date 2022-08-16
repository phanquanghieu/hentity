import React, { useState } from 'react'
import { Button, Modal } from 'ui'
import { cloneDeep } from 'lodash'
import { ATTRIBUTES } from 'constant/attributes'
import AttributeEditor from './AttributeEditor'
import { useFormatMessage } from 'hooks'

function ModalAttributes({ attributeEdit = {}, show, onClose }) {
  const [attribute, setAttribute] = useState(cloneDeep(attributeEdit))

  const t = useFormatMessage()
  return (
    <Modal show={show} header='Select' className='my-0 md:my-6 lg:my-20' onClose={onClose}>
      <div className='p-6 overflow-auto'>
        {!attribute.type && (
          <div className='grid grid-cols-3 gap-4'>
            {Object.values(ATTRIBUTES).map((ATTRIBUTE) => (
              <div
                className='h-14 px-4 border rounded-md shadow flex items-center cursor-pointer
                  hover:bg-base-100 hover:shadow-md'
                onClick={() => setAttribute({ ...ATTRIBUTE.model })}
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
        )}
        {attribute.type && (
          <AttributeEditor
            attribute={attribute}
            onChangeAttribute={(_attribute) => setAttribute({ ...attribute, ..._attribute })}
          />
        )}
      </div>
      {attribute.type && (
        <div className='px-5 py-4 border-t flex justify-between'>
          <Button>{t('Cancel')}</Button>
          <div>
            <Button className='mr-5 bg-white text-base-500' color='base'>
              {t('Add another field')}
            </Button>
            <Button color='base'>{t('Finish')}</Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default ModalAttributes
