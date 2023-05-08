class Round {
  constructor(rounds_lg) {
    this.rounds_lg = rounds_lg;
    this.rounds_sm = this.rounds_lg.find(".round-sm");
    this.margin = 20;
    this.draw();
    this.active(this, false);
    this.hover_fuc(this);
    this.resize_fuc(this);
  }
  draw = () => {
    this.w = this.rounds_lg.width();
    this.sm_r = this.w / 3;
    this.lg_r = this.w / 2;
    this.rounds_sm.width(this.sm_r);
  };
  active = (mode) => {
    mode === true ? this.rounds_lg.addClass("active") : this.rounds_lg.removeClass("active");
    this.rounds_sm.css({
      top: this.lg_r - this.sm_r / 2,
      left: mode === true ? -this.sm_r - this.margin : this.lg_r,
      "transform-origin": mode === true ? this.lg_r + this.sm_r + this.margin : 0,
    });
  };
  hover_fuc = () => {
    this.rounds_lg.hover(
      () => this.active(true),
      () => this.active(false)
    );
  };
  resize_fuc = () => {
    $(window).on("resize", () => this.draw());
  };
}
new Round($("#round-A"));
new Round($("#round-B"));
