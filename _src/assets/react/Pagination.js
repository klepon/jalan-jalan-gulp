import React, { Component } from 'react'
import Button from './Button';

class Pagination extends Component {
    componentWillReceiveProps = (nextProps) => {
        if( Math.ceil(this.props.total / this.props.per_page) === 1 && this.props.page !== 1 ) {
            this.props.reset_page();
        }
    }

    generate_pagination = () => {
        let i,
            rs = [],
            page,
            start = 0,
            end,
            max_end = Math.ceil(this.props.total / this.props.per_page);

        // get start base on current page
        if( this.props.page - this.props.paging_number / 2 > 1 ) {
            start = Math.floor(this.props.page - this.props.paging_number / 2);
        }

        // get end base on start and current page
        end = start + this.props.paging_number
        end = end > max_end ? max_end : end;

        // refine start to keep paging number consistant
        if( start > 0 && end - this.props.paging_number < start ) {
            start = end - this.props.paging_number;
        }

        // add go to first page
        if( start > 0 ) {
            rs.push(
                <Button
                    key={-1}
                    onClick={ this.props.on_select_page }
                    value={ 1 }
                    title="1"
                />
            )

            rs.push(
                <span key={0}>...</span>
            )
        }

        // loop pagging
        for( i = start; i < end; i++ ) {
            page = i+1;

            // render item
            rs.push(
                <Button
                    key={ i }
                    onClick={ this.props.on_select_page }
                    value={ page }
                    current={ this.props.page }
                    title={ page }
                />
            )
        }

        // add go to last page
        if( end < max_end ) {
            if( end + 1 < max_end ) {
                rs.push(
                    <span key={max_end + 1}>...</span>
                )
            }

            rs.push(
                <Button
                    key={max_end + 2}
                    onClick={ this.props.on_select_page }
                    value={ max_end }
                    title={ max_end }
                />
            )
        }

        return rs;
    }

    render () {
        return (
            <div className="pagination">
                {this.generate_pagination()}
            </div>
        )
    }
}

export default Pagination;
