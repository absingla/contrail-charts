/*
 * Copyright (c) Juniper Networks, Inc. All rights reserved.
 */
import _ from 'lodash'
import * as d3Array from 'd3-array'
import ContrailChartsView from 'contrail-charts-view'
import Config from './CompositeYConfigModel'
import CompositeChart from 'helpers/CompositeChart'
import SelectColor from '../../actions/SelectColor'
import SelectAccessor from '../../actions/SelectAccessor'
import Zoom from '../../actions/Zoom'
import SelectChartType from './actions/SelectChartType'
/**
 * Creates composed chart with X and Y scales and compatible components like: Line, Area, StackedBar, etc
 */
export default class CompositeYView extends ContrailChartsView {
  static get Config () { return Config }
  static get dataType () { return 'DataFrame' }
  static get Actions () { return {SelectColor, SelectAccessor, SelectChartType, Zoom} }

  constructor (...args) {
    super(...args)
    this._composite = new CompositeChart()
    this.listenTo(this.model, 'change', this.render)
  }

  get tagName () { return 'g' }

  get selectors () {
    return _.extend(super.selectors, {
      node: '.child',
      axis: '.axis',
    })
  }

  get innerWidth () {
    const margin = this._plotMargin || this.config.get('margin')
    return this.width - margin.left - margin.right
  }

  get innerHeight () {
    const margin = this._plotMargin || this.config.get('margin')
    return this.height - margin.top - margin.bottom
  }

  render () {
    super.render()
    this._plotMargin = _.cloneDeep(this.config.get('margin'))
    _.each(this.config.get('axes'), (config, name) => {
      config.position = config.position || AxisConfigModel.defaultPosition(name)
      this._plotMargin[config.position] += this._plotMargin.label
    })

    this._updateComponents()
    this.config.calculateScales(this.model, this.innerWidth, this.innerHeight)
    this._renderAxes()

    // force composite scale for children components
    const components = this._composite.getByType(_(this.config.yAccessors).map('chart').uniq().value())
    _.each(components, component => {
      const componentAxis = this.config.getAxisName(component.config.get('y'))
      // TODO even without silent this will not trigger config 'change' because of nested attribute
      component.config.set('y.scale', this.config.get(`axes.${componentAxis}.scale`), {silent: true})
      component.render()
    })

    this._ticking = false
  }
  /**
   * Works only with incremental values at x scale, as range is set as min / max values for x scale
   * There is no option to set zoomed range by exact position at x scale (start / end)
   */
  zoom (ranges) {
    const accessorsByAxis = _.groupBy(this.config.yAccessors, 'axis')
    accessorsByAxis.x = [{accessor: this.config.get('plot.x.accessor')}]
    _.each(accessorsByAxis, (accessors, axisName) => {
      if (_.isEmpty(_.filter(accessors, a => ranges[a.accessor]))) return
      const range = d3Array.extent(_(accessors).map(accessor => ranges[accessor.accessor]).flatten().value())
      if (range[0] !== range[1] || _.isNil(range[0])) this.config.set(`axes.${axisName}.domain`, range)
    })
  }
  /**
   * Render axes and calculate inner margins for charts
   */
  _renderAxes () {
    const plotYAxes = _(this.config.yAccessors).map('axis').uniq().value()
    const axes = _.filter(this.config.get('axes'), (axis, name) => {
      axis.name = name
      return name.startsWith('x') || plotYAxes.includes(name)
    })

    const elements = this.svg.selectAll(this.selectors.axis)
      .data(axes, d => d.name)

    elements.enter().each(axis => {
      const config = _.extend({
        id: `${this.id}-${axis.name}`,
        name: axis.name,
        margin: this._plotMargin,
        height: this.config.get('height'),
        width: this.config.get('width'),
        accessors: this.config.getAxisAccessors(axis.name),
      }, axis)
      config.tickCoords = this.config._syncScales(AxisConfigModel.getDirection(config.position), config.scale)

      const component = this._composite.add({
        type: 'Axis',
        config,
        container: this._container,
      })
      component.el.__data__ = axis
    })

    elements.each(axis => {
      const component = this._composite.get(`${this.id}-${axis.name}`)

      const config = _.extend({
        margin: this._plotMargin,
        height: this.config.get('height'),
        width: this.config.get('width'),
        accessors: this.config.getAxisAccessors(axis.name),
      }, axis)
      config.tickCoords = this.config._syncScales(component.config.direction, config.scale)

      // if only a scale is changed Backbone doesn't trigger "change" event and no render will happen
      component.config.set(config, {silent: true})
    })

    elements.exit().each(axis => {
      this._composite.remove(`${this.id}-${axis.name}`)
    })
  }
  /**
   * Child components are initialized on the first call
   * Individual component scales are calculated and stored in this.config
   * No rendering here
   */
  _updateComponents (p) {
    const config = {
      // all sub charts should not react on model change as some preparation for them is done here
      frozen: true,
      // TODO add axes space to the chart margins
      margin: this._plotMargin,
      width: this.width,
      height: this.height,
      x: {
        accessor: this.config.get('plot.x.accessor'),
        scale: this.config.get('axes.x.scale'),
      }
    }
    const children = this.svg.selectAll(this.selectors.node)
      .data(this.config.children, d => d.key)

    children.enter().merge(children).each(child => {
      const type = this.config.getComponentType(child.accessors)
      config.id = `${this.id}-${child.key}`
      if (type === 'Line') config.y = child.accessors[0]
      else config.y = child.accessors

      let component = this._composite.get(`${this.id}-${child.key}`)
      if (component) component.config.set(config, {silent: true})
      else {
        component = this._composite.add({
          type,
          config,
          model: this.model,
          container: this._container,
        })
        component.d3.classed(this.selectorClass('node'), true)
        component.el.__data__ = {key: child.key}
      }

      component.config.calculateScales(this.model, this.innerWidth, this.innerHeight)
      const axisName = this.config.getAxisName(child.accessors)
      let calculatedDomain = this.config.get(`axes.${axisName}.calculatedDomain`) || []
      calculatedDomain = d3Array.extent(calculatedDomain.concat(component.config.get('y.scale').domain()))
      this.config.set(`axes.${axisName}.calculatedDomain`, calculatedDomain, {silent: true})
    })

    children.exit().each(child => {
      this._composite.remove(`${this.id}-${child.key}`)
    })
  }
}
