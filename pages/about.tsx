import Link from 'next/link'

export const About: React.FC = () => {
  return (
    <div>
      Welcome to the about page. Go to the{' '}
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      page.
    </div>
  )
}

export default About
