<template>
    <div class="container mt-5">
        <NuxtPage />
    </div>
</template>

<script setup>
    let S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let N = 16
    useState('verifier',()=>base64UrlEncode(Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('')));

    function base64UrlEncode(buffer) {
        return Buffer.from(buffer).toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')
    }
</script>