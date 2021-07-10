import Head from 'next/head'
import Header from '../components/Header'
import Table from '../components/home/Table'
import { TABLE_NUM } from '../utils'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Eat Sushi & More</title>
      </Head>

      <main className="h-screen">
        <Header title="Eat Sushi & More" />

        <div className="p-6 text-xl">
          {Array.from({ length: TABLE_NUM }).map((_, i) => (
            <Table key={i} table={String(i + 1)} />
          ))}
        </div>
      </main>
    </div>
  )
}
