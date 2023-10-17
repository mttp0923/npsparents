import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function ErrorMessage(props) {
  return (
    <div className="rounded-md bg-yellow-100 p-2">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error Message</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              {props.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}