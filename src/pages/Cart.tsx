export const Cart = () => {
    return (
        <main className='py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>

                {/* Header */}
                <div className='mb-8 relative'>
                    <section className='absolute inset-0 bg-gradient-cyber-alt opacity-5 blur-3xl'>
                        <article className='relative'>
                            <h2 className='text-4xl font-bold mb-3 scan-lines'>
                                <span className='text-[--color-text-primary]'>Shopping</span>
                                <span className='text-gradient-cyber'>Cart</span>
                            </h2>
                            <p className='text-[--color-text-secondary] text-lg'>
                                Review Your Items
                                <span className='text-[--color-secondary] font-mono ml-2'>Checkout</span>
                            </p>
                        </article>
                    </section>

                    {/* Placeholder Content */}
                    <section className='bg-[--color-bg-secondary] border border-[--color-border] rounded-lg p-8'>
                        <p className='text-[--color-text-secondary] text-center'>
                            🛒 Cart component coming soon...
                        </p>
                        <p className='text-[--color-text-muted] text-sm text-center mt-2 font-mono'>
                            ToDo: Implement w/ Redux
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
};