import { Fragment, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import StudInformation from './StudInformation'

export default function DisplayStudDetails(props) {
  return (
    <Transition.Root show={props.open} as={Fragment} appear>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox>

                <StudInformation fullName={props.fullName} homeAdd={props.homeAdd} homeAddValue={props.homeAddValue} 

                offEmail={props.offEmail} father={props.father} fatherValue={props.fatherValue} fa_tel={props.fa_tel} fa_telValue={props.fa_telValue} fa_email={props.fa_email} fa_emailValue={props.fa_emailValue}

                mother={props.mother} motherValue={props.motherValue} mo_tel={props.mo_tel} mo_telValue={props.mo_telValue} mo_email={props.mo_email} mo_emailValue={props.mo_emailValue}

               guardian={props.guardian} guardianValue={props.guardianValue} guardianContact={props.guardianContact} guardianContactValue={props.guardianContactValue} guardianRelation={props.guardianRelation} guardianRelationValue={props.guardianRelationValue} contact={props.contact} contactValue={props.contactValue} contact_add={props.contact_add} contact_addValue={props.contact_addValue} contact_no={props.contact_no} contact_noValue={props.contact_noValue} cancelEdit={props.cancelEdit} saveEdit={props.saveEdit} rem={props.rem} />

              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}