import React from 'react'
import { Modal } from 'react-modal'

export default function ReviewForm() {
  return (
    <>
    <button>Open Modal</button>
    <Modal>
      <h2>Inside Modal</h2>
    </Modal>
    </>
  )
}
