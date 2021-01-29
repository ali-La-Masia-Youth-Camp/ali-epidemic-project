import {Component, Vue} from 'vue-property-decorator';
import {Chart} from '@antv/g2';
import DataSet from '@antv/data-set';
import AJAX from '@/common/ajax';
import './style.scss';

@Component({})
export default class ChinaEpidemic extends Vue {
    public render() {
        return (
             <div class = 'fullpage-container__section' >
                <div id = 'china-container' class="china-container fix">
                <div class="header">
			<h1 class="header-title">中国模块</h1>
		</div>
		<div class="wrapper">
			<div class="content">
				<div class="col col-l">
					<div class="xpanel-wrapper xpanel-wrapper-40">
						<div class="xpanel xpanel-l-t">
							<div class="title"></div>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-60">
						<div class="xpanel xpanel-l-b">
							<div class="title"></div>
						</div>
					</div>
				</div>
				<div class="col col-c">
					<div class="xpanel-wrapper xpanel-wrapper-75">
						<div class="xpanel no-bg" id="map-container">
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-c-b">
							<div class="title title-long"></div>
						</div>
					</div>
				</div>
				<div class="col col-r">
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-r-t">
							<div class="title"></div>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-30">
						<div class="xpanel xpanel-r-m">
							<div class="title"></div>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-45">
						<div class="xpanel xpanel-r-b">
							<div class="title"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
                </div>
            </div>
        );
    }

    public mounted() {
        // 请求中国地图数据
        const ajax = new AJAX();
        const chinaMap = 'https://antv.vision/old-site/static/data/china.json';
        ajax.get(chinaMap)
            .then((mapData) => {
                const chart = new Chart({
                    container: 'map-container',
                    autoFit: true,
                    // height: 600,
                    // width:600,
                    padding: [40, 20],
                });
                chart.tooltip({
                    showTitle: false,
                    showMarkers: false,
                    shared: true,
                });
                // 同步度量
                chart.scale({
                    longitude: {
                        sync: true,
                    },
                    latitude: {
                        sync: true,
                    },
                });
                chart.axis(false);


                // 绘制世界地图背景
                const ds = new DataSet();
                const worldMap = ds.createView('back')
                    .source(mapData.data, {
                        type: 'GeoJSON',
                    });
                const worldMapView = chart.createView();
                worldMapView.data(worldMap.rows);
                worldMapView.tooltip(false);
                worldMapView.polygon().position('longitude*latitude').style({
                    fill: '#fff',
                    stroke: '#ccc',
                    lineWidth: 1,
                });

                // 可视化用户数据
                const userData = [{
                        name: '黑龙江',
                        value: 86.8,
                    },
                    {
                        name: '山东',
                        value: 106.3,
                    },
                    {
                        name: '新疆',
                        value: 94.7,
                    },
                    {
                        name: '海南',
                        value: 98,
                    },
                    {
                        name: '四川',
                        value: 98.4,
                    },
                    {
                        name: '甘肃',
                        value: 97.2,
                    },
                ];
                const userDv = ds.createView()
                    .source(userData)
                    .transform({
                        geoDataView: worldMap,
                        field: 'name',
                        type: 'geo.region',
                        as: ['longitude', 'latitude'],
                    })
                    .transform({
                        type: 'map',
                          callback: obj => {
                            return obj;
                          }
                    });
                const userView = chart.createView();
                userView.data(userDv.rows);
                userView.scale({
                    value: {
                        alias: '数量',
                    },
                    name: {
                        alias: '省份',
                    },
                });
                userView.polygon()
                    .position('longitude*latitude')
                    .color('value', ['red', 'darkred'])
                    .tooltip('name*value')
                    .style({
                        fillOpacity: 0.85,
                    })
                    .animate({
                        leave: {
                            animation: 'fade-out',
                        },
                    });
                userView.interaction('element-active');

                chart.render();

            });



    }
}
