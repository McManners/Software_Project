
function gridSystem(){
    return(
        <div className={'app'}>
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-sm'}> 1</div>
                    <div className={'col-sm'}> 2</div>
                    <div className={'col-sm'}> 3</div>
                </div>
                <div className={'row'}>
                    <div className={'col-sm'}>4</div>
                    <div className={'col-sm'}>5</div>
                </div>
            </div>
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-md-8'}>Main Content</div>
                    <div className={'col-md-4'}>Sidebar</div>
                </div>
            </div>

            <h2>Gutter example</h2>
            <div className={'container px-4'}>
                <div className={'row gx-5'}>
                    {/*gx affects the x-axis while gy affects the y-axis*/}
                    <div className={'col'}>
                        <div className={'p-3 border'}> Customer colum padding1</div>
                    </div>
                    <div className={'col'}>
                        <div className={'p-3 border'}> Customer colum padding2</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default gridSystem;
