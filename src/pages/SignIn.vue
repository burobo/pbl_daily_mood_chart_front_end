<template>
</template>

<script setup>
import sha256 from 'crypto-js/sha256';
import { Buffer } from 'buffer'

async function main() {
  try {
    let S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let N = 64
    const verifier = base64UrlEncode(Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join(''))
    localStorage.setItem('verifier', verifier)
    const challenge = base64UrlEncode(sha256Hash(Buffer.from(verifier)))
    const config = useRuntimeConfig();

    const params = {
      'client_id': config.FITBIT_CLIENT_ID,
      'response_type': 'code',
      'code_challenge': challenge,
      'code_challenge_method': 'S256',
      'scope': 'heartrate',
    }
    const urlSearchParam = new URLSearchParams(params).toString();
    const redirectUrl = "https://www.fitbit.com/oauth2/authorize/?" + urlSearchParam
    window.location.href = redirectUrl
  } catch (err) {
    console.error(err)
  }
}

function base64UrlEncode(buffer) {
  return Buffer.from(buffer).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function sha256Hash(buffer) {
  const hash = sha256(buffer);
  return hash.toString()
}

main()

</script>

<style lang="scss">

</style>
