/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Link from 'next/link'
import React, { useState } from 'react'

import { getApolloClient } from '../apollo/client'
import {
  useViewerQuery,
  useUpdateNameMutation,
  ViewerDocument,
  ViewerQuery,
} from '../apollo/queries/viewer.graphql'

const Index: React.FC = () => {
  const { viewer } = useViewerQuery().data!
  const [newName, setNewName] = useState('')
  const [updateNameMutation] = useUpdateNameMutation()

  const onChangeName = () => {
    updateNameMutation({
      variables: {
        name: newName,
      },
      update: (store, { data }) => {
        if (!data) return

        const { viewer } = store.readQuery<ViewerQuery>({ query: ViewerDocument }) || {}

        const newViewer = { ...viewer, name: data.updateName.name }

        newViewer.name = data.updateName.name

        store.writeQuery({ query: ViewerDocument, data: { viewer: newViewer } })
      },
    })
  }

  return (
    <div>
      You're signed in as {viewer.name} and you're {viewer.status}. Go to the{' '}
      <Link href="/about">
        <a>about</a>
      </Link>{' '}
      page.
      <div>
        <input
          type="text"
          placeholder="your new name..."
          onChange={e => setNewName(e.target.value)}
        />
        <input type="button" value="change" onClick={onChangeName} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = getApolloClient()

  await apolloClient.query({
    query: ViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
