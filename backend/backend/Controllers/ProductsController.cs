using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Context;
using backend.DTO;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        // GET: /<controller>/
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }
        //CRUD
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateUpdateProductDTO dto) {
            var newProduct = new ProductEntity()
            {
                Brand = dto.Brand,
                Title = dto.Title
            };
            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return Ok("Product Saved Good");
        }
        [HttpGet("GetAllProducts")]
        public async Task<ActionResult<List<ProductEntity>>> GetAllProducts() {
            var product = await _context.Products.OrderByDescending(q=>q.CreatedAt).ToListAsync();
            return Ok(product);

        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ProductEntity>> GetProductByID([FromRoute] long id) {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);
            if (product is null) {
                return NotFound("NO prod");
            }
            return Ok(product);
        }
        [HttpPut]
        
        public async Task<IActionResult> UpdateProduct([FromBody] CreateUpdateProductId cupi) {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == cupi.Id);
            if (product is null)
            {
                return NotFound("NO prod");
            }
            product.Title = cupi.CUPdto.Title;
            product.Brand = cupi.CUPdto.Brand;
            product.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok("prod updated");
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] long id) {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);
            if (product is null)
            {
                return NotFound("NO prod");
            }
            _context.Products.Remove(product);
           await  _context.SaveChangesAsync();
            return Ok("prod Deleted");

        }
    }
}

