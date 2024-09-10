import { useRouter } from 'next/router'
import Link from 'next/link'

const Header = ({ title }) => {
  const router = useRouter()
  const { pathname } = router

  return (
    <div className="flex justify-center items-center h-14 text-2xl border-b">
      {pathname !== '/' && (
        <Link href="/" legacyBehavior>
          <a className="h-8 w-8 absolute left-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </a>
        </Link>
      )}

      <div>{title}</div>
    </div>
  )
}

export default Header
