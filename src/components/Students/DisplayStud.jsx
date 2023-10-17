import { XMarkIcon } from "@heroicons/react/24/outline";

export default function DisplayStud(props) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
                <div className="ml-3 flex h-7 float-right">
              <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500" 
                onClick={props.cancelEdit} >
                <span className="sr-only">Close Panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>


        <div className="sm:flex sm:items-center">

          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users {props.grade}</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>

          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }