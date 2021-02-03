export default function(chart){
    // console.log(this);
    chart.on('element:click', (context) => {
        // console.log(context);
        this.$store.dispatch('setCityName',context.data.data.city);
    });

    chart.on('plot:mousemove', (context)=>{
        this.$store.dispatch('setCityName','');
    });
}