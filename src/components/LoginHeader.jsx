import { Disclosure } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

import schoolSeal from '../assets/npsLogo.png'

/*
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
*/

export default function LoginHeader() {
  return (
    <Disclosure as="nav" className="bg-red-900">
      {({ open }) => (
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <img
                    className="block h-10 w-auto lg:hidden"
                    src={schoolSeal}
                    alt="NPSSchool"
                  />
                  <img
                    className="hidden h-10 w-auto lg:block"
                    src={schoolSeal}
                    alt="NPSSchool"
                  />
                </div>
                <div className="mt-0 ml-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                  Naga Parochial School</div>
              </div>
            </div>
          </div>
      )}
    </Disclosure>
  )
}