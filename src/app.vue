<template>
    <div class="container mt-5">
        <button type="button" class="menu-btn" @click="open = !open">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list"
                aria-hidden="true" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
        </button>
        <div class="menu" :class="{ 'is-active': open }">
            <a href="/SignIn" class="menu__item text-decoration-none">Fitbit ログイン</a>
        </div>
        <NuxtPage />
    </div>
</template>

<style>
/*----------------------------
* メニュー開閉ボタン
*----------------------------*/
.menu-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 3;
    width: 40px;
    height: 40px;
    display: flex;
    border: solid;
    justify-content: center;
    align-items: center;
    background: #3cc0d9;
    color: #fff;
}

/*----------------------------
* メニュー本体
*----------------------------*/
.menu {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    width: 20vw;
    height: 100vh;
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #3cc0d9;
}

.menu__item {
    width: 100%;
    height: auto;
    padding: .5em 1em;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
}

/*----------------------------
* アニメーション部分
*----------------------------*/

/* アニメーション前のメニューの状態 */
.menu {
    transform: translateX(100vw);
    transition: all .3s linear;
}

/* アニメーション後のメニューの状態 */
.menu.is-active {
    transform: translateX(0);
}
</style>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>