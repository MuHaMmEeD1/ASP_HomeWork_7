using ECommerce.Core.DataAccess.EntityFramework;
using ECommerce.DataAccess.Abstraction;
using ECommerce.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.DataAccess.Concrete.EFEntityFramework
{
    public class EFProductDal : EFEntityRepositoryBase<Product, NorthwindContext>, IProductDal
    {
        private readonly NorthwindContext _context;
        public EFProductDal(NorthwindContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetSearchSortProductsAsync(string value, int page, int pageSize)
        {
            var products = await _context.Products
                .Skip(pageSize * (page - 1)) 
                .Take(pageSize) 
                .Where(p => p.ProductName.Contains(value)) 
                .OrderByDescending(p => p.ProductName.StartsWith(value)) 
                .ToListAsync();

            return products;
        }
    }
}
