import React from 'react'
import { Modal } from 'ui'
import EntityEditor from './EntityEditor'

function ModalCollection({ collectionEntity, dataEdit, mode, onSaveData, onDeleteData, onClose }) {
  return (
    <Modal
      header={
        mode === 'create'
          ? `Create new ${collectionEntity.displayName}`
          : `Edit ${collectionEntity.displayName}`
      }
      className='w-[75rem] min-h-full mt-0 bg-slate-100'
      show={true}
      onClose={onClose}
    >
      <div className='p-5'>
        <EntityEditor
          mode={mode}
          attributesModel={collectionEntity.attributes}
          dataEdit={dataEdit}
          onSaveData={onSaveData}
          onDeleteData={onDeleteData}
          showDelete
        />
      </div>
    </Modal>
  )
}

export default ModalCollection
