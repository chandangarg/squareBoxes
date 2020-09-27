
<?php 
header("Access-Control-Allow-Origin: *");

$data = '{ 
    "heatmap": {
        "id": "1C59FC3E-CAAB-4DDB-7838-08D6B059DF9A",
        "template_id": "BB5A9BD5-6823-4381-3E0C-08D77BF855BF",
        "read_only": true,
        "column_count": 6,
        "row_count": 5,
        "colour_items": [ 
            {
                "id": "6451F7D8-EFB9-4D76-89B2-08D6637419A4",
                "hex_code": "#66B92E",
                "label": "Low",
                "priority" : "12"
            },
            {
                "id": "5FE037C8-9203-40DE-E552-08D676738835",
                "hex_code": "#FFD400",
                "label": "Moderate",
                "priority" : "5"
            },
            {
                "id": "FD228D53-320B-4A8F-E8DE-08D67673C395",
                "hex_code": "#F5A624",
                "label": "High",
                "priority" : "6"
            },
            {
                "id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA",
                "hex_code": "#D65B4A",
                "label": "Extreme",
                "priority" : "1"
            },
            {
                "id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FC",
                "hex_code": "#D65B9A",
                "label": "Extreme",
                "priority" : "1"
            }
        ],
        "column_labels":[
            {"id":"1", "item_name": "Very High"},
            {"id":"2", "item_name": "High"},
            {"id":"3", "item_name": "Medium"},
            {"id":"4", "item_name": "Low"},
            {"id":"5", "item_name": "Very Low"}
        ],
        "row_labels":[
            {"id":"1", "item_name": "Very High"},
            {"id":"2", "item_name": "High"},
            {"id":"3", "item_name": "Medium"},
            {"id":"4", "item_name": "Low"},
            {"id":"5", "item_name": "Very Low"}
        ],
        "items": [
            [
            	{"id":1,"value":5,"priority": 10, "column_index": 0,"row_index": 1, "colour_id": "FD228D53-320B-4A8F-E8DE-08D67673C395"},
            	{"id":2,"value":10,"priority": 6, "column_index": 1,"row_index": 1, "colour_id": "FD228D53-320B-4A8F-E8DE-08D67673C395"},
            	{"id":3,"value":15,"priority": 4, "column_index": 2,"row_index": 1, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"},
            	{"id":4,"value":20,"priority": 2, "column_index": 3,"row_index": 1, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"},
            	{"id":5,"value":25,"priority": 1, "column_index": 4,"row_index": 1, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"},
                {"id":6,"value":30,"priority": 3, "column_index": 5,"row_index": 1, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"}
            ],
            [
            	{"id":7,"value":4,"priority": 11, "column_index": 0,"row_index": 2, "colour_id": "5FE037C8-9203-40DE-E552-08D676738835"},
            	{"id":8,"value":8,"priority": 8,  "column_index": 1,"row_index": 2, "colour_id": "5FE037C8-9203-40DE-E552-08D676738835"},
            	{"id":9,"value":12,"priority": 5, "column_index": 2,"row_index": 2, "colour_id": "5FE037C8-9203-40DE-E552-08D676738835"},
            	{"id":10,"value":16,"priority": 3, "column_index": 3,"row_index": 2, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"},
            	{"id":11,"value":20,"priority": 2,"column_index": 4,"row_index": 2, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"},
                {"id":12,"value":24,"priority": 3, "column_index": 5,"row_index": 2, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"}
            ],
            [
            	{"id":13,"value":3,"priority": 12, "column_index": 0,"row_index": 3, "colour_id": "6451F7D8-EFB9-4D76-89B2-08D6637419A4"},
            	{"id":14,"value":6,"priority": 9, "column_index": 1,"row_index": 3, "colour_id": "5FE037C8-9203-40DE-E552-08D676738835"},
            	{"id":15,"value":9,"priority": 7, "column_index": 2,"row_index": 3, "colour_id": "5FE037C8-9203-40DE-E552-08D676738835"},
            	{"id":16,"value":12,"priority": 5, "column_index": 3,"row_index": 3, "colour_id": "FD228D53-320B-4A8F-E8DE-08D67673C395"},
            	{"id":17,"value":15,"priority": 4, "column_index": 4,"row_index": 3, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"},
                {"id":18,"value":18,"priority": 3, "column_index": 5,"row_index": 3, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"}
            ],
            [
            	{"id":19,"value":2,"priority": 13, "column_index": 0,"row_index": 4, "colour_id": "6451F7D8-EFB9-4D76-89B2-08D6637419A4"},
            	{"id":20,"value":4,"priority": 11, "column_index": 1,"row_index": 4, "colour_id": "5FE037C8-9203-40DE-E552-08D676738835"},
            	{"id":21,"value":6,"priority": 9, "column_index": 2,"row_index": 4, "colour_id": "5FE037C8-9203-40DE-E552-08D676738835"},
            	{"id":22,"value":8,"priority": 8, "column_index": 3,"row_index": 4, "colour_id": "FD228D53-320B-4A8F-E8DE-08D67673C395"},
            	{"id":23,"value":10,"priority": 6, "column_index": 4,"row_index": 4, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"},
                {"id":24,"value":12,"priority": 3, "column_index": 5,"row_index": 4, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FA"}
            ],
            [
            	{"id":25,"value":1,"priority": 14, "column_index": 0,"row_index": 5, "colour_id": "6451F7D8-EFB9-4D76-89B2-08D6637419A4"},
            	{"id":26,"value":2,"priority": 13, "column_index": 1,"row_index": 5, "colour_id": "6451F7D8-EFB9-4D76-89B2-08D6637419A4"},
            	{"id":27,"value":3,"priority": 12, "column_index": 2,"row_index": 5, "colour_id": "6451F7D8-EFB9-4D76-89B2-08D6637419A4"},
            	{"id":28,"value":4,"priority": 11, "column_index": 3,"row_index": 5, "colour_id": "5FE037C8-9203-40DE-E552-08D676738835"},
            	{"id":29,"value":5,"priority": 10, "column_index": 4,"row_index": 5, "colour_id": "FD228D53-320B-4A8F-E8DE-08D67673C395"},
                {"id":30,"value":6,"priority": 3, "column_index": 5,"row_index": 5, "colour_id": "E14DBD5C-0B2B-45ED-1CA8-08D67673F3FC"}
            ]
        ]
    }
}';


echo $data = $data;
/*$data = array();
for($i=0; $i < 5; $i++){
	$data[$i] = array();
	$jdata = array();
	for($j=0; $j < 5; $j++ ){
		$jdata[$j]['id'] = ($j+1);
		$jdata[$j]['value'] = ($j*5);
		$jdata[$j]['priority'] = 1;
		$jdata[$j]['background'] = 'red';
	}
	$data[$i] = $jdata;
}
echo json_encode($data);*/
exit;


