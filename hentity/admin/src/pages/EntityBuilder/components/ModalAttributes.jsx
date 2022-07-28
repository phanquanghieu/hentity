import React from 'react'
import { Modal } from 'ui'

function ModalAttributes({ show, onClose }) {
  return (
    <Modal show={show} header='Select' className='!h-auto my-24' onClose={onClose}>
      <div className='p-4 h-[calc(100%-65px)] overflow-auto'>
        <div className='h-96'>dddd</div>
        <div className='h-96'>dddd</div>
      </div>
    </Modal>
  )
}

export default ModalAttributes

const AttributeBlueprint = {}
