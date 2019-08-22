module.exports =  {
    render(req,res,next){
        res.json({
            state : true ,
            data : [
                {
                    title   : "AAA",
                    test_id : "aaa",
                    label   : "30%"
                },
                {
                    title   : "BBB",
                    test_id : "bbb",
                    label   : "45%"
                },
                {
                    title   : "CCC",
                    test_id : "ccc",
                    label   : "55%"
                }
            ]
        })
    }
}