import React, { Component } from "react"
import { Dropdown } from "react-bootstrap"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getProducts, filterProducts } from "../Redux/Actions/Actions"
import "../Styles/header.css"

class Header extends Component {
    state = {
        os: [],
        memory: [],
        storage: [],
        price:[],        
        ioscount: 0,
        androidcount: 0,
        memory4: 0,
        memory8: 0,
        memory12: 0,
        count64: 0,
        count128: 0,
        count264: 0
    }

    applyFilter = () => {
        let { os,memory,storage,price } = this.state
        let { products, filterProducts } = this.props
        
        products = products.filter(p => {
            let osfilter = true, memoryfilter = true, storagefilter=true, pricefilter=true
            if(os.length){
                osfilter = os.includes(p.os)
            }
            
            if(memory.length){
                memoryfilter = memory.includes(p.memory)
            }

            if(storage.length){
                storagefilter = storage.includes(p.storage)
            }
            if(price.length){
                pricefilter = false
                price.map(pr => {
                    if(pr == "10k"){
                        pricefilter = Number(p.price) > 0 && Number(p.price <= 10000)
                    }
                    else if(pr == "20k"){
                        pricefilter = Number(p.price) > 10000 && Number(p.price <= 20000)
                    }
                    else if(pr == "50k"){
                        pricefilter = Number(p.price) > 20000 && Number(p.price <= 50000)
                    } 
                    else if(pr == "1l") {
                        pricefilter = Number(p.price) > 50000 && Number(p.price <= 100000)
                    } 
                    else{
                        pricefilter = Number(p.price) > 100000
                    }                 
                })
            }
            
            return osfilter && memoryfilter && storagefilter && pricefilter
        })
        
        filterProducts(products)
    }

    changeOS = (event) => {    
        const {name,checked} = event.target 
        let {os} = this.state
                   
        if(checked){
            os.push(name)
        }
        else
            os = os.filter(o => o != name)
        this.setState({os: [...os] },this.applyFilter)
        
    }
    changeMemory = (event) => {
        const {name,checked} = event.target   
        let {memory} = this.state         
        
        if(checked){
            memory.push(name)
        }
        else
            memory = memory.filter(m => m != name)
        this.setState({memory: [...memory] },this.applyFilter)        
    }
    changeStorage = (event) => {
        const {name,checked} = event.target    
        let {storage} = this.state        

        if(checked){
            storage.push(name)
        }
        else
            storage = storage.filter(s => s != name)
        this.setState({storage: [...storage] },this.applyFilter) 
    }
    changePrice = event => {
        const {name,checked} = event.target  
        let {price} = this.state  
        
        if(checked){
            price.push(name)
        }
        else
            price = price.filter(p => p != name)
        this.setState({price: [...price] },this.applyFilter)
    }
    static getDerivedStateFromProps(props,state) {
        let { ioscount, androidcount, memory4, memory8, memory12, count64, count128, count264 } = state
        ioscount = 0 
        androidcount = 0
        memory4 = 0 
        memory8 = 0
        memory12 = 0 
        count64 = 0
        count128 = 0
        count264 = 0

        props.products.map(p => {
            if (p.os == "IOS")
                ioscount++
            else
                androidcount++
            if (p.memory == "4")
                memory4++
            else if (p.memory == "8")
                memory8++
            else
                memory12++
            if (p.storage == "64")
                count64++
            else if (p.storage == "128")
                count128++
            else
                count264++
        })
        return { 
            ioscount, androidcount, memory4, memory8, memory12, count64, count128, count264 
        }
    }
    render() {
        const { os,memory,storage,price, ioscount, androidcount, memory4, memory8, memory12, count64, count128, count264 } = this.state        
        return (
            <div className="header">
                <div className="headbox">
                    <Dropdown>
                        <Dropdown.Toggle >
                            OS
                        </Dropdown.Toggle>

                        <Dropdown.Menu key={`os-${os.length}`}>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="IOS"
                                    checked={os.includes("IOS")}
                                    onChange={this.changeOS} />{`IOS (${ioscount || 0})`}
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="ANDROID"
                                    checked={os.includes("ANDROID")}
                                    onChange={this.changeOS} />{`ANDROID (${androidcount || 0})`}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Memory
                        </Dropdown.Toggle>

                        <Dropdown.Menu key={`memory-${memory.length}`}>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="4"
                                    checked={memory.includes("4")}
                                    onChange={this.changeMemory} />{`4 GB (${memory4 || 0})`}
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="8"
                                    checked={memory.includes("8")}
                                    onChange={this.changeMemory} />{`8 GB (${memory8 || 0})`}
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="12"
                                    checked={memory.includes("12")}
                                    onChange={this.changeMemory} />{`12 GB (${memory12 || 0})`}
                            </Dropdown.Item>
                        </Dropdown.Menu>                    
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Storage
                        </Dropdown.Toggle>

                        <Dropdown.Menu key={`storage-${storage.length}`}>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="64"
                                    checked={storage.includes("64")}
                                    onChange={this.changeStorage} />{`64 GB (${count64 || 0})`}
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="128"
                                    checked={storage.includes("128")}
                                    onChange={this.changeStorage} />{`128 GB (${count128 || 0})`}
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="264"
                                    checked={storage.includes("264")}
                                    onChange={this.changeStorage} />{`264 GB (${count264 || 0})`}
                            </Dropdown.Item>
                        </Dropdown.Menu>                        
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Price Range
                        </Dropdown.Toggle>

                        <Dropdown.Menu key={`price-${price.length}`}>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="10k"
                                    checked={price.includes("10k")}
                                    onChange={this.changePrice} />0-10000
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="20k"
                                    checked={price.includes("20k")}
                                    onChange={this.changePrice} />10001-20000
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="50k"
                                    checked={price.includes("50k")}
                                    onChange={this.changePrice} />20001-50000
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="1l"
                                    checked={price.includes("1l")}
                                    onChange={this.changePrice} />50000-100000
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <input
                                    type="checkbox"
                                    name="abve1l"
                                    checked={price.includes("abve1l")}
                                    onChange={this.changePrice} />{`>100000`}
                            </Dropdown.Item>
                        </Dropdown.Menu>                        
                    </Dropdown>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        products: store.products,
        fproducts: store.fproducts
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProducts, filterProducts
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)