<template>
</template>

<script setup>
async function main() {
  try {
    const route = useRoute()
    const config = useRuntimeConfig();
    const tokenUrl = 'https://api.fitbit.com/oauth2/token'
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
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

    if (tokenBody.errors) {
      console.error(tokenBody.errors[0].message)
      error({ statusCode: 500 })
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

    const dataResponse = await fetch(dataUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenBody['access_token']}`,
      },
    })

    const dataBody = await dataResponse.json()

    if (dataBody.errors) {
      console.error(dataBody.errors[0].message)
      error({ statusCode: 500 })
      return
    }
  } catch (err) {
    console.error(err)
  }
}


main()

</script>

<style lang="scss">

</style>
