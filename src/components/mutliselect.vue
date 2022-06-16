<template>
    <div style="display: inline-block">
        <p style="margin-left: 10px">default</p>
        <el-select v-model="value" multiple placeholder="Select" style="width: 240px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>
</template>

<script>
export default {
    name: "select",
    data() {
        return {
            value: '',
        }
    },
    methods: {
        loadData() {
            console.log(this.value)
        }
    },
    props: ['options'],
    emits: ["getSelectedModels"],
    watch: {
        // whenever question changes, this function will run
        value(newValue, oldValue) {
            this.$emit("getSelectedModels",newValue)
        }
    },
}
</script>