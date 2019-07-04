<template>
    <div class="box-tool">
        <button
            class="btn-tool"
            draggable="true"
            @dragstart="dragstart_handler($event)"
            v-for="btn in boxtool"
            :key="btn.name"
            :id="btn.name"
        >
            <i 
                :class="btn.icon"
                class="icon-site"
            />
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            boxtool: [
                {icon: 'icon-text', name: 'element-text'},
                // {id: 'btn2', name: 'icon-internet'},
                // {id: 'btn3', name: 'icon-text-block'},
                // {id: 'btn4', name: 'icon-text-type'},
                {icon: 'icon-picture', name: 'element-image'},
                {icon: 'icon-play-button', name: 'element-video'},
                // {id: 'btn7', name: 'icon-gallery'},
                // {id: 'btn8', name: 'icon-shapes'},
                // {id: 'btn9', name: 'icon-wall-clock'},
                // {id: 'btn10', name: 'icon-sand-watch'},
                // {id: 'btn11', name: 'icon-cloudy'},
                // {id: 'btn12', name: 'icon-twitter'},
                // {id: 'btn13', name: 'icon-rss'},
                {icon: 'icon-youtube', name: 'element-youtube'},
                // {id: 'btn15', name: 'icon-facebook'},
            ]
        };
    },
    methods: {
        dragstart_handler(ev) {
            // Add the target element's id to the data transfer object
            ev.dataTransfer.setData("text/html", ev.target.id);
            ev.dataTransfer.dropEffect = "move";
        }
    }
};
</script>

