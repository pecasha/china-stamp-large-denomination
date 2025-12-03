#!/usr/bin/env node
import { exec } from "node:child_process";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import * as inquirer from "@inquirer/prompts";
import chalk from "chalk";
import sizeOf from "image-size";

const stampNo = await inquirer.input({
    message: "请输入邮票志号：",
    required: true,
    validate: text => {
        if(
            /^20\d{2}-[0-9]\d*$/.test(text) ||
            /^HN20\d{2}-[0-9]\d*$/.test(text) ||
            /^[GHP][0-9]\d*-[0-9]\d*$/.test(text) ||
            /^[GHP][0-9]\d*$/.test(text) ||
            /^T[0-9]\d*-20\d{2}$/.test(text)
        ) {
            return true;
        }
        return "邮票志号格式错误";
    }
});

let stampSerial = "1-1";
if(await inquirer.confirm({
    message: "是否需要输入图序？",
    default: true
})) {
    stampSerial = await inquirer.input({
        message: "请输入邮票图序：",
        required: true,
        validate: text => {
            if(/^[1-9]\d*-[1-9]\d*$/.test(text)) {
                const [a, b] = text.split("-").map(Number);
                if(b <= a) {
                    return true;
                }
            }
            return "邮票图序格式错误";
        }
    });
}

const stampImageName = stampSerial === "1-1" ? stampNo : `${stampNo}-${stampSerial.split("-").pop()}`;

const dataFilePath = path.join(process.cwd(), "src", "data", "stamp.json")

const data = JSON.parse(await fs.promises.readFile(dataFilePath, "utf8"));
for(const item of data) {
    if(item.img === stampImageName) {
        console.log();
        console.log(chalk.red("[错误] 此邮票已存在"));
        process.exit();
    }
}

const stampTypeMap = [
    "普通邮票",
    "特种邮票",
    "纪念邮票",
    "特别发行邮票",
    "贺卡专用邮票",
    "个性化服务专用邮票",
    "贺年专用邮票"
];
const stampType = await inquirer.select({
    message: "请选择邮票类型：",
    choices: stampTypeMap.map((name, value) => ({
        name,
        value
    }))
});

const stampTitle = await inquirer.input({
    message: "请输入邮票名称：",
    required: true
});

let stampName = "";
if(stampSerial !== "1-1") {
    stampName = await inquirer.input({
        message: "请输入邮票图名：",
        required: true
    });
}

const stampDate = await inquirer.input({
    message: "请输入邮票发行日期：",
    required: true,
    default: "yy-MM-dd",
    validate: text => {
        if(text === "yy-MM-dd") {
            return "请输入邮票发行日期"
        }
        if(
            /^\d{2}-\d{2}-\d{2}$/.test(text) &&
            new Date(`20${text.replaceAll("-", "/")}`).getTime()
        ) {
            return true;
        }
        return "邮票发行日期格式错误，正确格式：yy-MM-dd";
    }
});

const stampShape = await inquirer.select({
    message: "请选择邮票形状：",
    choices: [
        "矩形",
        "菱形",
        "圆形",
        "扇形",
        "异形",
        "六边形",
        "正八边形",
        "平行四边形"
    ].map((name, value) => ({
        name,
        value
    }))
});

let stampSize = "";
switch (stampShape) {
    case 0:
        const width = await inquirer.number({
            message: "请输入邮票宽度(毫米)：",
            min: 1,
            step: 1,
            required: true
        });
        const height = await inquirer.number({
            message: "请输入邮票高度(毫米)：",
            min: 1,
            step: 1,
            required: true
        });
        stampSize = `${width}×${height}`;
        break;
    case 2:
        const size = await inquirer.number({
            message: "请输入邮票直径(毫米)：",
            min: 1,
            step: 1,
            required: true
        });
        stampSize = `Ø${size}`;
        break;
    default:
        stampSize = await inquirer.input({
            message: "请输入邮票规格(毫米)：",
            required: true
        });
}

const stampValue = await inquirer.number({
    message: "请输入邮票面值(元)：",
    min: 2,
    step: 0.1,
    required: true
});

const stampSource = await inquirer.input({
    message: "请输入邮票数据来源：",
    validate: text => {
        if(text) {
            return /^(?:(http|https):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i.test(text);
        }
        return true;
    }
});

const imagesPath = path.join(process.cwd(), "static", "images");
const imagesName = `${stampImageName}.png`;

let stampImgRatio = 0;

if(!fs.existsSync(path.join(imagesPath, imagesName)) || await inquirer.confirm({
    message: "邮票图片已存在，是否要重新导入？",
    default: true
})) {
    const osPlatform = os.platform();
    let command = "";
    if(osPlatform === "darwin") {
        command = 'osascript -e \'tell app "System Events" to POSIX path of (choose file)\'';
    } else if(osPlatform === "win32") {
        command = `cmd /c chcp 65001>nul && powershell "Add-Type -AssemblyName System.Windows.Forms;$dialog = New-Object System.Windows.Forms.OpenFileDialog -Property @{Filter = '图像文件(*.png)|*.png';Title = '请选取邮票图片文件'};$dialog.ShowDialog() | Out-Null;$dialog.FileName"`;
    } else {
        console.log();
        console.log(chalk.red(`[错误] 您的系统不支持选择导入图片，请手动将邮票图片命名为“${imagesName}”放置到项目目录“/static/images”中`));
        process.exit();
    }

    try {
        const filePath = await new Promise((resolve, reject) => {
            exec(command, (error, stdout) => {
                if (error) {
                    reject(error.stderr);
                }
                resolve(stdout.replace(/(\r\n|\n|\r)/gm, ""));
            });
        });

        const dimensions = sizeOf(filePath);
        if(dimensions.type !== "png") {
            console.log();
            console.log(chalk.red(`[错误] 邮票图片格式错误，只支持使用 PNG 图片类型`));
            process.exit();
        }
        if(dimensions.width < 100 || dimensions.height < 100) {
            console.log();
            console.log(chalk.red(`[错误] 邮票图片尺寸错误`));
            process.exit();
        }

        stampImgRatio = +(dimensions.width / dimensions.height).toFixed(5);

        await fs.promises.copyFile(filePath, path.join(imagesPath, imagesName));
    } catch(err) {
        console.log(err);
        console.log(chalk.red(`[错误] 导入图片发生错误，请重试或手动将邮票图片命名为“${imagesName}”放置到项目目录“/static/images”中`));
        process.exit();
    }
}

const newStamp = {
    title: stampTitle,
    img: stampImageName,
    imgRatio: stampImgRatio,
    date: stampDate,
    value: stampValue,
    size: stampSize,
    type: stampTypeMap[stampType],
    source: stampSource || ""
}
if(stampName) {
    newStamp.name = stampName;
    newStamp.number = stampSerial;
}
data.unshift(newStamp);

await fs.promises.writeFile(dataFilePath, JSON.stringify(data, null, 4), "utf8");

console.log();
console.log(JSON.stringify(newStamp, null, 4));
console.log();
console.log(chalk.green(`[成功] 邮票“${stampTitle}${stampName?`-${stampName}`:""}”已添加`));
