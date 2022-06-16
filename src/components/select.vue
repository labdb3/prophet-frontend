<template>
    <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <p></p>
    <slot></slot>
</template>

<script>


export default {
    name: "select",
    data() {
        return {
            value:'',
        }
    },
    methods: {
        loadData() {
            console.log(this.value)
        }
    },
    props: ['options'],
    emits: ["getSelectedDataset"],
    watch: {
        // whenever question changes, this function will run
        value(newValue, oldValue) {
            this.$emit("getSelectedDataset", newValue)
        }
    },
}
</script>