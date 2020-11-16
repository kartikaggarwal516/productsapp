import React, { Component } from "react"
import axios from "axios"
import { getProducts,filterProducts } from "../Redux/Actions/Actions"
import { Table } from "react-bootstrap"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Header from "./Header"
import "../Styles/home.css"

const url = "https://run.mocky.io/v3/08c9d634-5deb-486a-b85e-0ac8c530074d"
class Home extends Component {
    state = {

    }
    getProductData = () => {
        axios.get(url)
            .then((res) => {
                // handle success
                console.log("res", res)
                this.props.getProducts(res.data)
                this.props.filterProducts(res.data)
                console.log("products", this.props.products)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
    componentDidMount() {
        this.getProductData()        
    }
    render() {
        const { products, fproducts } = this.props        
        return (
            <div className="homecontainer">
                <div className="hbox">
                    <Header />
                </div>
                <div className="tableview">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {(products[0] && Object.keys(products[0]))
                                    && Object.keys(products[0]).map((heading, i) => {
                                        return (
                                            <th key={i}>
                                                {heading.toUpperCase()}
                                            </th>
                                        )
                                    })}
                            </tr>
                        </thead>
                        <tbody>
                            {fproducts.map((product, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{product.id}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.name}</td>
                                        <td>{product.os}</td>
                                        <td>{product.memory}</td>
                                        <td>{product.storage}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
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
        getProducts,filterProducts
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)