function TransactionTable() {


    return (
        <div>
                <p class="mb-1 text-center font-bold ">Transaction</p>
            <table class="table-auto">
                <thead >
                    <tr className="divide-x-[10px] divide-gray-500">
                        <th className="px-13"></th>
                        <th className="px-13"></th>
                        <th className="px-13"></th>
                    </tr>
                </thead>
                <tbody className=" text-xs h-29 divide-y divide-gray-700 ">
                    <tr>
                        <td className="p-2 text-purple-300">+90 LTC</td>
                        <td>from 0xabc...123</td>
                        <td> 3h ago</td>
                    </tr>
                        <tr>
                            <td className="p-2 text-purple-300">+0.1 ETH</td>
                            <td>from 0xabc...123</td>
                            <td> 3h ago</td>
                        </tr>
                        <tr>
                            <td className="p-2 text-purple-300">+0.1 ETH</td>
                            <td>from 0xabc...123</td>
                            <td> 3h ago</td>
                        </tr>
                        <tr>
                            <td className="p-2 text-purple-300">+0.1 ETH</td>
                            <td>from 0xabc...123</td>
                            <td> 3h ago</td>
                        </tr>
                </tbody>
            </table>
        </div>

    )
}

export default TransactionTable;