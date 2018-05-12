<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>


<script>

    import echarts from 'echarts';

    export default {

        name: 'dataSourcePie',

        mounted() {

            this.$nextTick(() => {

                var dataSourcePie = echarts.init(document.getElementById('data_source_con'));

                const option = {
                  tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                  },
                  legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['上衣', '下装', '内衣', '牙刷', '生活用品']
                  },
                  series: [
                    {
                      name: '收入来源',
                      type: 'pie',
                      radius: '66%',
                      center: ['50%', '60%'],
                      data: [
                        {value: 2103456, name: '上衣', itemStyle: {normal: {color: '#9bd598'}}},
                        {value: 1305923, name: '下装', itemStyle: {normal: {color: '#ffd58f'}}},
                        {value: 543250, name: '内衣', itemStyle: {normal: {color: '#abd5f2'}}},
                        {value: 798403, name: '牙刷', itemStyle: {normal: {color: '#ab8df2'}}},
                        {value: 302340, name: '生活用品', itemStyle: {normal: {color: '#e14f60'}}}
                      ],
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                      }
                    }
                  ]
                };

                dataSourcePie.setOption(option);

                window.addEventListener('resize', function () {

                  dataSourcePie.resize();

                });

            });

        }

    }

</script>
