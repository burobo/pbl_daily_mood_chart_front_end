<template>
  {{ user.id }}
</template>

<script setup>
import { Buffer } from 'buffer'

async function main() {
  try {
    const route = useRoute()
    console.log(route.query.code)
    alert(route.query.code)
    const config = useRuntimeConfig();
    const user = config.FITBIT_CLIENT_ID
    const pass = config.FITBIT_CLIENT_SECRET
    const credentials = Buffer.from(`${user}:${pass}`).toString('base64')
    const tokenUrl = 'https://api.fitbit.com/oauth2/token'
    const tokenResponse = await fetch(tokenUrl, { // <5>
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'client_id': config.FITBIT_CLIENT_ID,
        'code': route.query.code,
        'code_verifier': localStorage.getItem('verifier'),
        'grant_type': 'authorization_code',
      }).toString(),
    })

    const tokenBody = await tokenResponse.json()

    if (tokenBody.errors) { // <6>
      console.error(tokenBody.errors[0].message)
      res.status(500).end()
      return
    }

    const userId = '-'
    const date = 'today'
    const detailLevel = '1sec'
    const dataUrl = 'https://api.fitbit.com/' + [
      '1',
      'user',
      userId,
      'activities',
      'heart',
      'date',
      date,
      '1d',
      `${detailLevel}.json`
    ].join('/')

    const dataResponse = await fetch(dataUrl, { // <7>
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenBody['access_token']}`,
      },
    })

    const dataBody = await dataResponse.json()

    if (dataBody.errors) { // <8>
      console.error(dataBody.errors[0].message)
      res.status(500).end()
      return
    }

    res.type('text/plain') // <9>
      .send(JSON.stringify(dataBody, null, 2))
  } catch (err) {
    console.error(err)
  }
}


main()

</script>

<style lang="scss">

</style>
