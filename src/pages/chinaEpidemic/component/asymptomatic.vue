<template>
    <div id="asym-container"></div>
</template>

<script>
import { Chart, registerShape } from '@antv/g2';

export default {
    name: 'asym',
    data() {
        return {
            city: [
                { status: '无', value: 34 },
                { status: '有', value: 85 },
            ],
        };
    },

    mounted() {
        setTimeout(() => {
            registerShape('point', 'pointer', {
            draw(cfg, group) {
            const point = cfg.points[0];
            const center = this.parsePoint({ x: 0, y: 0 });
            const target = this.parsePoint({ x: point.x, y: 0.9 });
            const dirVec = { x: center.x - target.x, y: center.y - target.y };
            // normalize
            const length = Math.sqrt(dirVec.x * dirVec.x + dirVec.y * dirVec.y);
            dirVec.x *= (1 / length);
            dirVec.y *= (1 / length);
            // rotate dirVector by -90 and scale
            const angle1 = -Math.PI / 2;
            const x1 = Math.cos(angle1) * dirVec.x - Math.sin(angle1) * dirVec.y;
            const y1 = Math.sin(angle1) * dirVec.x + Math.cos(angle1) * dirVec.y;
            // rotate dirVector by 90 and scale
            const angle2 = Math.PI / 2;
            const x2 = Math.cos(angle2) * dirVec.x - Math.sin(angle2) * dirVec.y;
            const y2 = Math.sin(angle2) * dirVec.x + Math.cos(angle2) * dirVec.y;
            // polygon vertex
            const path = [
              ['M', target.x + x1 * 1, target.y + y1 * 1],
              ['L', center.x + x1 * 3, center.y + y1 * 3],
              ['L', center.x + x2 * 3, center.y + y2 * 3],
              ['L', target.x + x2 * 1, target.y + y2 * 1],
              ['Z'],
            ];
            const tick = group.addShape('path', {
              attrs: {
                path,
                fill: cfg.color,
              },
            });
            return tick;
          },
        });

            const data = [
              { type: '无症状', value: 0.42 },
              { type: '有症状', value: 0.68 },
            ];
            const chart = new Chart({
              container: 'asym-container',
              autoFit: true,
              height: 500,
            });
            chart.data(data);
            chart.coordinate('polar', {
              startAngle: -10 / 8 * Math.PI,
              endAngle: 2 / 8 * Math.PI,
              radius: 0.75,
            });
            chart.scale('value', {
              min: 0,
              max: 1,
              tickInterval: 1,
            });
            chart.axis(false);
            chart.facet('rect', {
              fields: ['type'],
              showTitle: false,
              eachView: function eachView(view, facet) {
                const fdata = facet.data[0];
                // 指针
                view
                  .point()
                  .position('value*1')
                  .shape('pointer')
                  .color('#d8d8d8')
                  .animate({
                    appear: {
                      animation: 'fade-in',
                    },
                  });
                // 仪表盘背景
                view.annotation().arc({
                  top: false,
                  start: [0, 1],
                  end: [1, 1],
                  style: {
                    stroke: '#ebedf0',
                    lineWidth: 10,
                  },
                });
                // 仪表盘前景
                view.annotation().arc({
                  start: [0, 1],
                  end: [fdata.value, 1],
                  style: {
                    stroke: '#1890ff',
                    lineWidth: 10,
                  },
                });
                // 仪表盘信息
                const percent = parseInt(fdata.value * 100, 10);

                view.annotation().text({
                  position: ['50%', '70%'],
                  content: fdata.type,
                  style: {
                    fontSize: 14,
                    fill: '#8c8c8c',
                    fontWeight: 300,
                    textAlign: 'center',
                  },
                  offsetX: 0,
                });
                view.annotation().text({
                  position: ['50%', '75%'],
                  content: `${percent}%`,
                  style: {
                    fontSize: 34,
                    fill: 'white',
                    fontWeight: 500,
                    textAlign: 'center',
                  },
                  offsetX: 0,
                  offsetY: 10,
                });
              },
            });
            chart.render();
        });
    },
};
</script>

<style scoped>
#asym-container{
    width: 100%;
    height: 100%;
}
</style>