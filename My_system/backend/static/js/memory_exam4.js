/*
实验二：引入拓扑特征（形状和颜色）
研究目的：1、探讨人眼对于拓扑特征的捕获是否优先于形状和颜色
        2、同时研究其在回忆和识别时，对记忆的影响
实验变量：1、形状：["circle","rect", "triangle","star","hexagram"]
        2、颜色：{"green": "#00a600", "yellow": "#a6a600", "blue": "#0000a6", "purple": "#a600a6",
        "red": "#a60000"}
实验设计：1、为了排除人眼对于位置记忆的影响，我们将位置随机化，即每个目标出现在各个位置的概率相同
        2、实验刺激分成两大组：1.拓扑作为目标 20=5*4（颜色/形状*目标位置）
                           2.拓扑作为干扰 240=5*4*3*4（COLOR_T*DIST_T*DIST_D*COLOR_D）
        2、实验利用因子设计，如果不考虑干扰和颜色的交互，则每个60
        3、根据预实验结果考虑要不要优化成155个
        4、在实验过程中穿插眼动校准，以确保眼动的准确性
G*Power样本量：1、计算2(颜色、形状)*2(干扰、目标)  *  4(位置)*5(形状/颜色)*4(干扰颜色)*3(干扰位置)的重复测量方差分析（within_between），
                          被试间变量                         试间变量
              得出8名参与者得出0.8的power，8名参与者得出0.95的power
              2、如果是2(识别、召回)*2(干扰、目标)*2(颜色、形状)  *  5(形状/颜色)*4(干扰颜色)*3(干扰位置)
                                 被试间变量                                 试间变量
              得出16名参与者得出0.8的power，16名参与者得出0.95的power
*/
const {data, run, timelineVariable} = initJsPsych({
    extensions: [
        {type: jsPsychExtensionWebgazer}
    ],
})

const Recognition_exam_intro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p>识别实验(四个刺激物)：试验都以 500 毫秒的固定时间开始，然后会有一个 500 毫秒的fixation，接下来是100毫秒的单个项目展示，' + ISI[0] + '毫秒的空白间隔后，会呈现一个四个项目的阵列。</p> ' +
        '<p>要求：记忆单个项目，并在多个项目阵列中快速找到，并根据数字键盘的 " 4 " ," 8 "," 6 "," 2 " 进行选择响应，如果不记得或者不存在选择"5"。</p>' +
        '<p>按" "键继续。</p>',
    choices: [' '],
    post_trial_gap: 500,
}
const Recognition_shape_exam_intro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p>要求：记忆单个项目的形状。</p>' +
        '<p>按" "键继续，实验开始。</p>',
    choices: [' '],
    post_trial_gap: 500,
}
const Recognition_color_exam_intro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p>要求：记忆单个项目的颜色。</p>' +
        '<p>按" "键继续，实验开始。</p>',
    choices: [' '],
    post_trial_gap: 500,
}
const Recall_exam_intro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p>回忆实验(四个刺激物)：试验都以 500 毫秒的固定时间开始，然后会有一个 500 毫秒的fixation，接下来是 2500 毫秒的样本展示，' + ISI[0] + '毫秒的空白间隔后，会有一个目标刺激的提示。</p> ' +
        '<p>要求：记忆所呈现刺激物的位置，根据提示选择对应刺激的位置，根据数字键盘的 " 4 " ," 8 "," 6 "," 2 " 进行选择响应，如果不记得或者不存在选择"5"。</p>' +
        '<p>按" "键继续。</p>',
    choices: [' '],
    post_trial_gap: 500,
}
const Recall_shape_exam_intro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p>要求：根据目标的形状进行选择。</p>' +
        '<p>按" "键继续，实验开始。</p>',
    choices: [' '],
    post_trial_gap: 500,
}
const Recall_color_exam_intro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p>要求：根据目标的颜色进行选择。</p>' +
        '<p>按" "键继续，实验开始。</p>',
    choices: [' '],
    post_trial_gap: 500,
}

const stim_dist = [[width / 2 - 300, height / 2], [width / 2, height / 2 - 300],
    [width / 2 + 300, height / 2], [width / 2, height / 2 + 300]]

//处理获得的刺激数组，各25
let recognition_shape = [], recall_shape = [], recognition_color = [], recall_color = []
recognition_shape.push.apply(recognition_shape, shape_topo_T)
recognition_shape.push.apply(recognition_shape, shape_topo_D)//topo作为非目标
recognition_color.push.apply(recognition_color, color_topo_T)
recognition_color.push.apply(recognition_color, color_topo_D)//topo作为非目标
recall_shape.push.apply(recall_shape, shape_topo_T)
recall_shape.push.apply(recall_shape, shape_topo_D)//topo作为非目标
recall_color.push.apply(recall_color, color_topo_T)
recall_color.push.apply(recall_color, color_topo_D)//topo作为非目标

//形状不一，颜色统一
recognition_shape = shuffle(recognition_shape)
recall_shape = shuffle(recall_shape)
//颜色不一，形状统一
recognition_color = shuffle(recognition_color)
recall_color = shuffle(recall_color)
console.log(recognition_shape,recall_shape)

//生成识别和回忆实验
// const recognition_shape_exam1 = generateRecognitionTrail(recognition_shape, stim_dist, 1,ISI[2],1,4,"shape")//50
const recognition_color_exam1 = generateRecognitionTrail(recognition_color, stim_dist, 1,ISI[2],1,4,"color")

// const recall_shape_exam1 = generateRecallTrail(recall_shape, stim_dist, 1,ISI[0],1,4,"shape")
const recall_color_exam1 = generateRecallTrail(recall_color, stim_dist, 1,ISI[0],1,4,"color")
//两组实验过程中重新进行眼动校准
// const recognition_node_timeline_shape_1 = {
//     timeline: [
//         recognition_exam_intro,
//         recognition_shape_exam_intro,
//         recognition_shape_exam1
//     ]
// }

// const recognition_node_timeline_color_1 = {
//     timeline: [
//         recognition_exam_intro,
//         recognition_color_exam_intro,
//         recognition_color_exam1,
//     ]
// }

// const recall_node_timeline_shape_1 = {
//     timeline: [
//         recall_exam_intro,
//         recall_shape_exam_intro,
//         recall_shape_exam1,
//     ]
// }

// const recall_node_timeline_color_1 = {
//     timeline: [
//         recall_exam_intro,
//         recall_color_exam_intro,
//         recall_color_exam1,
//     ]
// }

let exam_done = {
    type: jsPsychHtmlButtonResponse,
    choices: ['CSV'],
    css_classes: ['mouse'],
    stimulus: `
         <p>实验结束!</p>
         <p>点击下载数据。</p>
`,
    on_finish: function (datas) {
        let name = data.get().filter({"trial_type": "survey-text", "trial_index": 2}).trials[0].response.name
        let exam_type = data.get().filter({"trial_type": "canvas-keyboard-response"}).trials[0].task
        let ISI = data.get().filter({"trial_type": "canvas-keyboard-response"}).trials[0].ISI
        let type = data.get().filter({"trial_type": "canvas-keyboard-response"}).trials[0].type
        if (datas.response === 0) {
            data.get().localSave('csv', name + "_" + exam_type +  "_" + ISI + "_4_"+ type +"_Exam_Memory-data.csv")
        }
    }
}

let stimArr = {
    "Recognition": {
        "shape": recognition_shape,     
        "color": recognition_color
    },
    "Recall": {
        "shape": recall_shape,
        "color": recall_color
    }
}

function f1(ISIs, TaskType, StudyAttribute) {
    isi = Number(ISIs)
    let intro = eval(TaskType + '_exam_intro')
    console.log(isi,TaskType,StudyAttribute)


    const timeline = []
    timeline.push(enter_fullscreen)
    timeline.push(preload)
    timeline.push(survey_before_trail)
    timeline.push(init_camera)
    timeline.push(calibration_timeline)
    timeline.push(intro)

    if (TaskType === "Recognition") {
        if (StudyAttribute === "颜色") {
            let stim = stimArr[TaskType]["color"]
            exam = generateRecognitionTrail(stim, stim_dist, 1, isi, 1, 4, "color")
            // timeline.push(color_exam_intro)
            timeline.push(exam)
        } else if (StudyAttribute === "形状") {
            let stim = stimArr[TaskType]["shape"]
            exam = generateRecognitionTrail(stim, stim_dist, 1, isi, 1, 4, "shape")
            // timeline.push(shape_exam_intro)
            timeline.push(exam)
        } 
    } else {
        if (StudyAttribute === "颜色") {
            let stim = stimArr[TaskType]["color"]
            exam = generateRecallTrail(stim, stim_dist, 1, isi, 1, 4, "color")
            // timeline.push(color_exam_intro)
            timeline.push(exam)
        } else if (StudyAttribute === "形状"){
            let stim = stimArr[TaskType]["shape"]
            exam = generateRecallTrail(stim, stim_dist, 1, isi, 1, 4, "shape")
            // timeline.push(shape_exam_intro)
            timeline.push(exam)
        } 
    }
    timeline.push(exit_fullscreen)
    timeline.push(exam_done)
    timeline.push(show_data)
    console.log(timeline)
    run(timeline)
}
