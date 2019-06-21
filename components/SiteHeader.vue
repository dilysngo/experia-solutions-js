<template>
    <div class="site-header d-flex justify-content-end align-content-center">
        <div class="box-status d-flex align-items-center">
            <p class="free-account">
                Free Account - <span>14 days left </span>
            </p>
        </div>
        <div class="box-account d-flex align-items-center">
            <div class="wrapper-avatar">
                <img 
                    class="img-avatar"
                    src="/images/avatar.png"
                    alt="Avatar"
                >
            </div>
            <div class="info-account">
                <h6>Lewis</h6>
                <nuxt-link
                    class="log-out"
                    to="/"
                >
                    Log out
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
