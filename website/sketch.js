function setup() {
  createCanvas(200, 200);
  background(51);
  console.log('hello');
  loadJSON('/api/v1/drums', gotData);
  let button = select('#submit');
  button.mousePressed(submitDrum);
};

function submitDrum() {
  let drumName = select('#drumName').value();
  let brand = select('#brand').value();
  console.log(drumName, brand);
  loadJSON('add/' + drumName + 'brand');
}

function gotData(data) {
  let keys = Object.keys(data);
  console.log(keys);
  for(let i = 0; i < keys.length; i++){
    let drumName = data[i].name;
    let x = random(width);
    let y = random(height);
    fill(255);
    text(drumName, x, y);
  }
}